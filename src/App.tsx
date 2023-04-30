import { useState, useEffect } from 'react';
import {
    Slider,
    SliderTrack,
    SliderMark,
    SliderFilledTrack,
    SliderThumb,
    Center,
    Box,
    InputGroup,
    Input,
    InputRightElement,
    IconButton,
    Heading,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

import { copyToClipboard, generatePassword } from './utils';
import ChordPlayer from './ChordPlayer';
import { ChordType } from 'tonal';

const DEFAULT_PASSWORD_LENGTH = 8;

const startNotes = [
    'C',
    'C#',
    'Db',
    'D',
    'D#',
    'Eb',
    'E',
    'F',
    'F#',
    'Gb',
    'G',
    'G#',
    'Ab',
    'A',
    'A#',
    'Bb',
    'B',
];

function App() {
    const [passwordLength, setPasswordLength] = useState(
        DEFAULT_PASSWORD_LENGTH
    );

    const chords = ChordType.all().map((get) => get.aliases[0]);

    const startNote = startNotes[Math.floor(Math.random() * startNotes.length)];

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
        <Center
            h="100vh"
            w="100vw"
            // bgImage="url('/herbie-chick-fbcover.webp')"
            bgSize="cover"
        >
            <Box
                p={8}
                border="1px"
                borderColor="gray.200"
                backgroundColor="#ffffff"
                // backgroundImage={`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='46' viewBox='0 0 70 46'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.83'%3E%3Cpolygon points='68 44 62 44 62 46 56 46 56 44 52 44 52 46 46 46 46 44 40 44 40 46 38 46 38 44 32 44 32 46 26 46 26 44 22 44 22 46 16 46 16 44 12 44 12 46 6 46 6 44 0 44 0 42 8 42 8 28 6 28 6 0 12 0 12 28 10 28 10 42 18 42 18 28 16 28 16 0 22 0 22 28 20 28 20 42 28 42 28 28 26 28 26 0 32 0 32 28 30 28 30 42 38 42 38 0 40 0 40 42 48 42 48 28 46 28 46 0 52 0 52 28 50 28 50 42 58 42 58 28 56 28 56 0 62 0 62 28 60 28 60 42 68 42 68 0 70 0 70 46 68 46'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}
            >
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
                <div>
                    <label>Choose password length</label>
                    <Slider
                        aria-label="slider-ex-1"
                        defaultValue={DEFAULT_PASSWORD_LENGTH}
                        min={3}
                        max={11}
                        onChange={(val) => {
                            setPasswordLength(val);
                        }}
                    >
                        <SliderMark
                            value={passwordLength}
                            textAlign="center"
                            bg="blue.500"
                            color="white"
                            mt="-10"
                            ml="-5"
                            w="12"
                        >
                            {passwordLength}
                        </SliderMark>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </div>

                <ChordPlayer
                    startNote={startNote}
                    chord={generatedPassword}
                    chords={chords}
                />
            </Box>
        </Center>
    );
}

export default App;
