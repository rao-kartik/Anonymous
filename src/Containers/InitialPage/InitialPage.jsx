import React, { useEffect } from 'react';
import SignIn from '../Auth/SignIn';
import { Box, Flex, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PATHS, REDUCERS } from '../../constants';

const content = [
  {
    imageUrl:
      'https://framerusercontent.com/images/DVdb5CRU9H4nOYtwcELIMAh2I.jpg?scale-down-to=512',
    title: 'Chat',
    description:
      'Anonymously chat with friends and make new connections. Anonymous gives you the freedom to speak your mind without revealing your identity.',
  },
  {
    imageUrl:
      'https://framerusercontent.com/images/HFgKRHP2cSG5YaJDVVeiyiT75e0.jpg?scale-down-to=512',
    title: 'Fundraising',
    description:
      'Anonymous takes privacy seriously and ensures that your data remains protected. Enjoy a safe digital environment without compromising on creativity.',
  },
  {
    imageUrl: 'https://framerusercontent.com/images/ELdZeUL7ESUeWSf7qHISAG50.jpg?scale-down-to=512',
    title: 'Customize',
    description:
      'Personalize your experience and create a unique space to express yourself. With Anonymous, make your mark without revealing who you are.',
  },
];

const InitialPage = () => {
  const { userInfo } = useSelector((reducer) => reducer[REDUCERS.common]);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.isLoggedIn) {
      navigate(PATHS.home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.isLoggedIn]);

  return (
    <Box position="relative" width="100%">
      <Box position="absolute" top={4} right={4} zIndex={2}>
        <SignIn />
      </Box>

      <Flex w="100%" h="100vh" alignItems="center" justifyContent="center" bg="#124559">
        <Box
          w="100%"
          h="100%"
          position="absolute"
          top={0}
          left={0}
          backgroundImage="url('https://framerusercontent.com/images/grKeC7LspLoStyfrcBYxRXFV8.png')"
          objectFit="cover"
          objectPosition="center"
          backgroundSize="100%"
          opacity={0.1}
          overflow="hidden"
        />
        <Heading
          color="#aec3b0"
          position="relative"
          zIndex={1}
          size="4xl"
          maxW={800}
          textAlign="center"
          lineHeight={1.2}
        >
          Revolutionaize your anonymity online
        </Heading>
      </Flex>

      <Box bg="#aec3b0">
        <Flex p={100} maxW="1200px" margin="auto">
          <Heading w="50%" size="2xl">
            Post <br /> Anonymously
          </Heading>

          <Text w="50%">
            Forget about privacy concerns while sharing thoughts and opinions. Anonymous lets you
            post anonymously, so you'll feel free to express yourself without fear of judgment.
          </Text>
        </Flex>
      </Box>

      <Box bg="#fff" pb={100}>
        <Flex maxW="1200px" margin="auto" p={100}>
          <Box w="50%">
            <Image
              src="https://framerusercontent.com/images/tWxCf6tZvRCos616cKV5PxR8Lh4.png"
              alt="pic"
              w={200}
              h={200}
            />
          </Box>

          <Box w="50%">
            <Heading lineHeight={2}>Groups</Heading>

            <Text>
              Find like-minded people and share ideas without limitations. Our diverse and engaging
              groups make it simple to dive into discussions on various topics and make connections.
            </Text>
          </Box>
        </Flex>

        <Grid templateColumns="repeat(3, 1fr)" gap={8} maxW="1200px" margin="auto" px={100}>
          {content?.map((_item) => (
            <GridItem w="100%" key={_item?.title}>
              <Flex w="100%" flexDirection="column" gap={6}>
                <Box overflow="hidden" borderRadius={24} filter="grayscale(100%)">
                  <Image src={_item?.imageUrl} w="100%" h={280} />
                </Box>

                <Flex gap={2} flexDirection="column">
                  <Text lineHeight={1.4}>{_item?.title}</Text>

                  <Text>{_item?.description}</Text>
                </Flex>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Box>

      <Flex flexDirection="column" alignItems="center" justifyContent="center" gap={8} pb={100}>
        <Heading>Get Started</Heading>
        <Text maxW={600} textAlign="center">
          Join the revolution of anonymous social media. Be part of a community that values privacy
          and individuality. Sign up now to enjoy the world of AnonSocial!
        </Text>

        <SignIn background="#01161e" color="#ffffff" />
      </Flex>

      <Text w="100%" textAlign="center" pb={50}>
        © 2023 Anonymous, All Rights Reserved.
      </Text>
    </Box>
  );
};

export default InitialPage;
