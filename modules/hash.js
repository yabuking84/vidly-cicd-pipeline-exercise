import bcrypt from 'bcrypt';

async function run(string) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(string,salt);

    return hashed;
}

export default {
    run
}