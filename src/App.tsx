import { CopyIcon } from '@chakra-ui/icons';
import {
    Box,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ChordType } from 'tonal';
import ChordPlayer from './ChordPlayer';
import { PasswordLengthSlider } from './PasswordLengthSlider';
import { DEFAULT_PASSWORD_LENGTH, START_NOTES } from './constants';
import { copyToClipboard, generatePassword } from './utils';

function App() {
    const [passwordLength, setPasswordLength] = useState(
        DEFAULT_PASSWORD_LENGTH
    );

    const chords = ChordType.all().map((get) => get.aliases[0]);

    const startNote =
        START_NOTES[Math.floor(Math.random() * START_NOTES.length)];

    const chord = generatePassword(passwordLength - startNote.length, chords);

    const fullChord = startNote + chord;
    const [generatedPassword, setGeneratedPassword] = useState(fullChord);
    useEffect(() => {
        setGeneratedPassword(fullChord);
    }, [passwordLength]);

    useEffect(() => {
        setGeneratedPassword(fullChord);
    }, []);

    return (
        <div className="record-container">
            <div className="record"></div>
            <Box p={8} position="absolute" zIndex={1} bg="#FFF">
                <Heading as="h1" size="md">
                    Passwords for Musicians
                </Heading>
                <InputGroup size="md" my={4}>
                    <Input value={generatedPassword} readOnly />
                    <InputRightElement p={4}>
                        <IconButton
                            colorScheme="blue"
                            aria-label="Search database"
                            icon={<CopyIcon />}
                            onClick={() => copyToClipboard(generatedPassword)}
                        />
                    </InputRightElement>
                </InputGroup>
                <PasswordLengthSlider
                    defaultLength={DEFAULT_PASSWORD_LENGTH}
                    setPasswordLength={setPasswordLength}
                    passwordLength={passwordLength}
                />

                <ChordPlayer
                    startNote={startNote}
                    chord={generatedPassword}
                    chords={chords}
                />
            </Box>
        </div>
    );
}

export default App;
