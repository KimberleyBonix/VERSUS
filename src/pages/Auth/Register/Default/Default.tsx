import {
  Anchor,
  Text,
  Box,
  Button,
  Group,
  Stack,
  TextInput,
  Title,
  Flex,
} from '@mantine/core';

function Default() {
  return (
    <Box className="right-content">
      <Title className="title" size="2.25rem" c="#FFF">
        Inscription
      </Title>

      <Stack>
        <Box>
          <TextInput
            label="Email"
            placeholder="Saisissez votre email"
            c="#FFF"
            className="section"
          />

          <TextInput
            label="Mot de passe"
            placeholder="Saisissez votre mot de passe"
            c="#FFF"
            className="section"
          />

          <TextInput
            label="Confirmation de mot de passe"
            placeholder="Saisissez votre mot de passe"
            c="#FFF"
            className="section"
          />

          <Group justify="flex-end">
            <Button variant="outline">S&apos;inscrire</Button>
          </Group>
        </Box>

        <Flex direction="row" wrap="wrap" className="form-bottom">
          <Text c="#FFF" fz="0.9rem">
            Vous avez déjà un compte ?
          </Text>

          <Button variant="outline" fullWidth>
            <Anchor href="/sign-in">Se connecter</Anchor>
          </Button>

          <Anchor href="/" underline="always" c="#FFF" fz="0.9rem">
            Retour à la page d&apos;acccueil
          </Anchor>
        </Flex>
      </Stack>
    </Box>
  );
}

export default Default;