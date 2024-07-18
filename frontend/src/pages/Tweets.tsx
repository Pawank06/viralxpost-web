import { TweetCard } from "@/components/TweetCard";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import config from "@/config/config";
import { getAllTweets, Tweet } from "@/http/api";
import { useQuery } from "@tanstack/react-query";

import { Loader, PlusCircle } from "lucide-react";

const Tweets = () => {
  const { data, error, isLoading } = useQuery<{ tweets: Tweet[] }, Error>({
    queryKey: ["tweets"],
    queryFn: getAllTweets,
  });
  if (config.isDevelopment) {
    console.log(data);
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen"><Loader className="animate-spin"/></div>;
  }

  return (
    <>
      <div className="flex"></div>
      <div
        className="flex flex-1 flex-col rounded-lg py-8 border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <main className="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="grid">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                </TabsList>
                <div className="">
                  <DropdownMenu>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Active
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Create Tweet
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            <TabsContent value="all"></TabsContent>
          </Tabs>
          
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.tweets && data.tweets.length > 0 ? (
              data.tweets.map((tweet, index) => {
                const key = tweet.id || index;
                if (config.isDevelopment) {
                  console.log(`Tweet Key: ${key}`);
                }
                return <TweetCard key={key} tweet={tweet} />;
              })
            ) : (
              error && <div>{error.message}</div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Tweets;
