import {
    Box,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
} from '@chakra-ui/react';
interface PasswordLengthSliderProps {
    defaultLength: number;
    passwordLength: number;
    setPasswordLength: (value: number) => void;
}
export function PasswordLengthSlider({
    defaultLength,
    setPasswordLength,
    passwordLength,
}: PasswordLengthSliderProps) {
    return (
        <div>
            <label>Choose password length</label>
            <Slider
                aria-label="slider-ex-1"
                defaultValue={defaultLength}
                min={3}
                max={11}
                onChange={(val) => {
                    setPasswordLength(val);
                }}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize={6} bgColor="tomato">
                    <Box>{passwordLength}</Box>
                </SliderThumb>
            </Slider>
        </div>
    );
}
