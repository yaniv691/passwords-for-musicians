import { Button } from '@chakra-ui/react';
import { Howl } from 'howler';
import { Chord, note, transpose } from 'tonal';
import sounds from './pianosprite.mp3';

const ChordPlayer = ({ chord, startNote }: any) => {
    const playChord = () => {
        const chordIntervals = Chord.get(chord).intervals;
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
            onloaderror() {},
        });

        const soundEngine = {
            play(chordNotes: string[]) {
                const chordMidiNumbers = chordNotes.map(
                    (noteName) => note(noteName).midi
                );
                chordMidiNumbers.forEach(
                    (noteMidiNumber) =>
                        noteMidiNumber && sound.play(noteMidiNumber.toString())
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
