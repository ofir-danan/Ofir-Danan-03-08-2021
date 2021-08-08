import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
  Box,
  Radio,
  RadioGroup,
  Switch,
} from "@chakra-ui/react";
import { Settings as SettingsIcon } from "@styled-icons/fluentui-system-regular/Settings";
import store from "../store";
import { setUnit, setDarkMode } from "../actions";

function Settings() {
  const storePref = store.getState();
  const [userUnit, setUserUnit] = useState(storePref.unit);
  const [darkModePref, setDarkModePref] = useState(storePref.darkMode);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // set unit preference
  useEffect(() => {
    store.dispatch(setUnit(userUnit));
  }, [userUnit]);

  // set dark mode preference
  useEffect(() => {
    store.dispatch(setDarkMode(darkModePref));
  }, [darkModePref]);

  return (
    <>
      <SettingsIcon onClick={onOpen} className={"setting-icon"} />
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Set Your Preferences
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <label htmlFor="darkMode">Dark Mode</label>
                <Switch
                  ml="10"
                  onChange={() => setDarkModePref(!darkModePref)}
                  defaultChecked={darkModePref}
                  id="darkMode"
                />
              </Box>

              <Box>
                <label htmlFor="unit">Select Temperature Unit</label>
                <RadioGroup
                  id="unit"
                  onChange={(e) => setUserUnit(e)}
                  defaultValue={storePref.unit}
                >
                  <Stack direction="row">
                    <Radio value="Metric">C</Radio>
                    <Radio value="Imperial">F</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Settings;
