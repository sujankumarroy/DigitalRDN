export default async (request) => {
    
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            }
        });
    }

    try {
        const { key } = await request.json();

        if (key !== process.env.ADMIN_KEY) {
            return new Response(
                JSON.stringify({ success: false, error: "Unauthorized Admin." }),
                { status: 401, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }}
            );
        }

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }}
        );

    } catch (err) {
        return new Response(
            JSON.stringify({ success: false, error: err.message }),
            { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }}
        );
    }
};
