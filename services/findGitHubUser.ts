export const findGitHubUser = async (username: string) => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        if (!response.ok) {
            throw new Error("Nenhum perfil foi encontrado com esse nome de usuário. {breakLine} Tente novamente");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}