

export default function randomUsername(email: string) {
    let username;

    if (email) {
        username = email.split("@")[0];
    } else {
        username = "Unknown";
    }

    return username;
}