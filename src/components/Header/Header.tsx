import { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
  Box,
  Button,
  Anchor,
  AppShell,
  Flex,
  Avatar,
  Burger,
} from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import SearchBar from '../SearchBar/SearchBar';

import './Header.scss';
import { LocalStorage } from '../../utils/LocalStorage';
import { user } from '../../store/reducers/user';
import CreateAvatar from '../Element/CreateAvatar';

function Header() {
  // const [opened, { toggle }] = useDisclosure();
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector((state) => state.login.isConnected);
  const userData = useAppSelector((state) => state.user.data);
  const userNameValue = userData.username;
  const useAvatarValue = userData.avatar;

  useEffect(() => {
    if (isConnected) {
      const userAuth = LocalStorage.getItem('auth');

      const { userId } = userAuth.auth;
      dispatch(user(userId));
    }
  }, [dispatch, isConnected]);

  return (
    <>
      <Flex gap="md" className="actions" visibleFrom="sm">
        <Button
          className="button button-new__event"
          component="a"
          href="/event/create"
        >
          Organiser un event
        </Button>

        <SearchBar />
      </Flex>

      {!isConnected ? (
        <Box className="connexion">
          <Button component="a" href="/sign-in" className="button button-login">
            Se connecter
          </Button>
        </Box>
      ) : (
        <Flex className="profile" align="center" gap="md">
          <Anchor href="/profile">{userNameValue}</Anchor>
          <CreateAvatar hw="2.5rem" seed={useAvatarValue} />
        </Flex>
      )}
    </>
  );
}

export default Header;
