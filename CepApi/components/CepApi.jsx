export async function getCep(cep) {
    try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        return null;
    }
}