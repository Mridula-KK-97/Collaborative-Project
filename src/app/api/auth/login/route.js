 export async function POST(request) {
      try {
        const { username, password } = await request.json();

        if (username === "admin" && password === "admin123") { 
          return new Response(JSON.stringify({ message: "Login successful" }), { status: 200 });

        } else {
          return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
        }
      } catch (error) {
        return new Response(JSON.stringify({ message: "Error processing request", error: error.message }), { status: 500 });
      }
    }