export const checkPasswordStrength = (password: string) => {
    if (password.length < 4) {
        return 'Super weak';
    } else if (password.length < 8) {
        return 'Weak';
    } else if (password.length < 12) {
        return 'Moderate';
    } else {
        return 'Strong';
    }
};

export const copyToClipboard = (value: any) =>
    navigator.clipboard.writeText(value);

// export const generatePassword = (length: number, passwords: any) => {
//     const filteredPasswords = passwords[length];

//     if (filteredPasswords.length > 0) {
//         const filterPasswordNoRoots = filteredPasswords.filter(
//             (password: string) => !password.includes('/')
//         );
//         const randomIndex = Math.floor(
//             Math.random() * filterPasswordNoRoots.length
//         );
//         return filterPasswordNoRoots[randomIndex];
//     }
//     return false;
// };

export const generatePassword = (
    length: number,
    passwords: string[]
): string => {
    const filteredPasswords = passwords.filter(
        (password) => password.length === length
    );
    return filteredPasswords[
        Math.floor(Math.random() * filteredPasswords.length)
    ];
};
