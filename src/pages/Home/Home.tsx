import { useEffect } from 'react';
import { Anchor, Image, Box, Flex, Title, SimpleGrid } from '@mantine/core';
import Slider from '../../components/Slider/Slider';
import EventThumb from '../../components/Element/Thumb/Event';
import { Event as AppEvent } from '../../@types/event';

import './Home.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAllEvents } from '../../store/reducers/events';
import { LocalStorage } from '../../utils/LocalStorage';
import { fetchAllUserFavGames } from '../../store/reducers/userFavGames';
import { fetchUserEvents } from '../../store/reducers/userEvents';

function Home() {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.events);
  const favGames = useAppSelector((state) => state.userFavGames.games);
  const userEvents = useAppSelector((state) => state.userEvents.events);

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  // function that calculates the number of days left until the event starts
  const calculateDaysLeft = (startDate) => {
    // creates a new Date object representing the current date and time
    const now = new Date();

    // creates a new Date object from the 'startDate' string
    // 'startDate' should be in a format that the Date constructor can interpret such as 'YYYY-MM-DD'. This line converts the string into a Date object.
    const start = new Date(startDate);

    // calculates the difference in milliseconds between the event's start date and the current date
    const difference = start - now;

    // converts the difference from milliseconds to days
    // math.ceil is used to round up to the nearest whole day as even a partial day counts as a full day for the countdown.
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return daysLeft > 0 ? daysLeft : 0;
  };

  const sortEventsByParticipants = (eventsArray: AppEvent[]) => {
    return (
      eventsArray
        // Use .slice to generate a copy of the array because .sort changes the array it affects directly
        .slice()
        .sort((a, b) => b.participants.length - a.participants.length)
    );
  };

  const sortedEvents = sortEventsByParticipants(events);

  const isConnected = useAppSelector((state) => state.login.isConnected);
  // const userGames = useAppSelector((state) => state.loggedUser.data.games);

  useEffect(() => {
    if (isConnected) {
      const userAuth = LocalStorage.getItem('auth');

      const { userId } = userAuth.auth;
      dispatch(fetchAllUserFavGames(userId));
      dispatch(fetchUserEvents(userId));
    }
  }, [dispatch, isConnected]);

  return (
    <>
      <Flex justify="center" align="center" className="title-container">
        <Title order={1}>Organisez, rassemblez, jouez !</Title>
      </Flex>

      <Slider />

      {isConnected && userEvents.length > 0 && (
        <Box className="container">
          <Flex justify="space-between" align="center" className="title">
            <Title tt="capitalize">Mes events</Title>

            <Anchor href="#" className="categories__title-more">
              Voir plus
            </Anchor>
          </Flex>

          <SimpleGrid cols={3} className="categories-grid">
            {userEvents.slice(0, 3).map((userEvent) => (
              <EventThumb
                key={userEvent.id}
                image={userEvent.thumbnail || 'url_de_limage_par_defaut'}
                name={userEvent.title}
                type={
                  userEvent.platform
                    ? userEvent.platform.name
                    : 'Plateforme non définie'
                }
                date={userEvent.start_date}
                countdown={calculateDaysLeft(userEvent.start_date)}
              />
            ))}
          </SimpleGrid>
        </Box>
      )}

      <Box className="container">
        <Flex justify="space-between" align="center" className="title">
          <Title tt="capitalize">les prochains events</Title>

          <Anchor href="#" className="categories__title-more">
            Voir plus
          </Anchor>
        </Flex>

        <SimpleGrid cols={3} className="categories-grid">
          {events.slice(0, 3).map((event) => (
            <EventThumb
              key={event.id}
              image={event.thumbnail || 'url_de_limage_par_defaut'}
              game={event.game ? event.game.name : 'nom pas trouvé'}
              name={event.title}
              type={
                event.platform ? event.platform.name : 'Plateforme non définie'
              }
              date={event.start_date}
              countdown={calculateDaysLeft(event.start_date)}
            />
          ))}
        </SimpleGrid>
      </Box>

      <Box className="container">
        <Flex justify="space-between" align="center" className="title">
          <Title tt="capitalize">Les plus populaires</Title>

          <Anchor href="#" className="categories__title-more">
            Voir plus
          </Anchor>
        </Flex>

        <SimpleGrid cols={3} className="categories-grid">
          {sortedEvents.slice(0, 3).map((event) => (
            <EventThumb
              key={event.id}
              image={event.thumbnail || 'url_de_limage_par_defaut'}
              game={event.game ? event.game.name : 'nom pas trouvé'}
              name={event.title}
              type={
                event.platform ? event.platform.name : 'Plateforme non définie'
              }
              date={event.start_date}
              countdown={calculateDaysLeft(event.start_date)}
            />
          ))}
        </SimpleGrid>
      </Box>

      {isConnected && favGames.length > 0 && (
        <Box className="container">
          <Box className="title">
            <Title tt="capitalize">mes jeux préférés</Title>
          </Box>

          <SimpleGrid cols={4} className="games__grid">
            {favGames.map((game) => (
              <Anchor href="/game/events" key={game.id}>
                <Image src={game.thumbnail} className="thumb" />
              </Anchor>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </>
  );
}

export default Home;
