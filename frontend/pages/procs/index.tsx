import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { App, title } from "../../components/App";
import { useMount, useProcesses } from "../../lib/Workspace";
import React from "react";
import Link from "next/link";
import { Card } from "../../components/DashboardContent";
import { CircleIcon } from "../modules";
import { FiEdit, FiSearch, FiServer } from "react-icons/fi";
import { ProtectedPage } from "../../lib/auth";

function colorFromStatus(status: string) {
  switch (status) {
    case "DONE":
      return "green.600";
    case "CRASHED":
      return "red.500";
    case "SUSPEND":
      return "orange.500";
    default:
      return "gray";
  }
}

const Home: NextPage = () => {
  const { data: instances } = useProcesses();
  
  return (
    <ProtectedPage>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Apeiro" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <App>
        <Heading pb={4} size="md">Processes</Heading>
        <Stack spacing={4}>
          {instances?.procs?.map((instance: {
            id: string;
            mount_id: string;
            name: string;
            status: string;
            snapshot_v2_size: number;
          }) => (
            <Card key={instance.id} minH={0} p={4} bgColor="bg-surface">
              <HStack justify="space-between">
                <Heading size="xs">
                  <CircleIcon mr={2} color={colorFromStatus(instance.status)} />
                  {instance.name} &middot;{" "}
                  <Text fontSize="lg" as="span" color="muted">
                    {instance.status ?? "none"} &nbsp;
                    {instance.id} ({instance.mount_id}) - {instance.snapshot_v2_size} bytes
                  </Text>
                </Heading>
                <HStack>
                  <Link href={`/procs/${instance.id}`}>
                    <Button
                      variant="primary"
                      leftIcon={<FiSearch fontSize="1.25rem" />}
                    >
                      Inspect
                    </Button>
                  </Link>
                </HStack>
              </HStack>
              {
                /* <HStack pt={4} width="100%">
              <Accordion
                width="100%"
                allowToggle={true}
              >
                <AccordionItem>
                  {({ isExpanded }) => {
                    if (!isExpanded) {
                      return (
                        <>
                          <h2>
                            <AccordionButton>
                              <Box flex="1" textAlign="left">
                                Value
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                        </>
                      );
                    }
                    return (
                      <>
                        <h2>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              Value
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          TODO
                        </AccordionPanel>
                      </>
                    );
                  }}
                </AccordionItem>
              </Accordion>
            </HStack> */
              }
            </Card>
          ))}
        </Stack>
      </App>
      </ProtectedPage>
  );
};

export default Home;

// {instances && instances?.processes?.map((instance: string) => (
//   <><Link key={instance} href={`/procs/${instance}`}>
//     <Button>pid_{instance}</Button>
//   </Link><br/></>
// ))}
