import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../hook/useFetch";

const tabs = ["About", "Qualifications", "Responsibilities"];

//----------------------------------------------------------

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { data, isloading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);
  const displayTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No data provided"} />
        );

      case "Qualifications":
        return (
          <Specifics
            title={"Qualifications"}
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );

      case "Responsibilities":
        return (
          <Specifics
            title={"Responsibilities"}
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isloading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text
              style={{
                color: COLORS.primary,
                fontSize: SIZES.h2,
                fontWeight: "bold",
                textAlign: "center",
                textDecorationLine: "underline",

              }}
            >Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text
            style={{
              color: COLORS.primary,
              fontSize: SIZES.h2,
              fontWeight: "bold",
              textAlign: "center",
              textDecorationLine: "underline",
              
            }}
            >No data found</Text>
          ) : (
            <View
              style={{
                padding: SIZES.medium,
                paddingBottom: 100,
              }}
            >
              <Company
                companyLogo={data[0].company_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent(activeTab, data[0])}
            </View>
          )}
        </ScrollView>

        <JobFooter 
          url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
