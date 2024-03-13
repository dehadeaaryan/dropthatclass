

export default function newUsername(email: string) {
    let username;

    if (email) {
        username = email.split("@")[0].replace(".", "").split('').sort(() => Math.random() - 0.5).join('');
    } else {
        username = "Unknown";
    }

    return username;
}