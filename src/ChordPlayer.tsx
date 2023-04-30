import { Button } from '@chakra-ui/react';
import { transpose, note, Chord } from 'tonal';

import { Howl } from 'howler';
import sounds from './pianosprite.mp3';

const ChordPlayer = ({ chord, chords, startNote }: any) => {
    const playChord = () => {
        const chordIntervals = Chord.get(chord).intervals;
        console.log('ChordType.get(chord)', Chord.get(chord));
        const chordNotes = chordIntervals.map((interval) =>
            transpose(startNote + '1', interval)
        );
        const generateNotes = () => {
            const notes = {};
            let timeIndex = 0;
            const noteLength = 2400;
            for (let i = 24; i <= 96; i++) {
                //@ts-ignore
                notes[i] = [timeIndex, noteLength];
                timeIndex += noteLength;
            }
            return notes;
        };
        const sound = new Howl({
            src: [sounds],
            sprite: { ...generateNotes() },
            onload() {
                console.log('sound loaded');
                soundEngine.init();
            },
            onloaderror() {},
        });

        const soundEngine = {
            init() {
                // sound.play('34');
            },
            play(chordNotes: string[]) {
                const chordMidiNumbers = chordNotes.map(
                    (noteName) => note(noteName).midi
                );
                chordMidiNumbers.forEach((noteMidiNumber) =>
                    //@ts-ignore
                    sound.play(noteMidiNumber.toString())
                );
            },
        };
        soundEngine.play(chordNotes);
    };
    return (
        <>
            <Button onClick={() => playChord()}>Play</Button>
        </>
    );
};

export default ChordPlayer;
