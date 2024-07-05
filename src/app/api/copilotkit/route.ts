// Import necessary modules and functions
import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/backend";
import { Action } from "@copilotkit/shared";
import { scrape } from "./tavily"; // Import the previously defined scrape function

// Define a scraping action with its name, description, parameters, and handler function
const scrapingAction: Action<any> = {
	name: "scrapeContent", // Name of the action
	description: "Call this function to scrape content from a url in a query.", // Description of the action
	parameters: [
		{
			name: "query", // Name of the parameter
			type: "string", // Type of the parameter
			description:
				"The query for scraping content. 5 characters or longer. Might be multiple words", // Description of the parameter
		},
	],
	// Handler function to execute when the action is called
	handler: async ({ query }) => {
		console.log("Scraping query: ", query); // Log the query to the console
		const result = await scrape(query); // Call the scrape function with the query and await the result
		console.log("Scraping result: ", result); // Log the result to the console
		return result; // Return the result
	},
};

// Define an asynchronous POST function to handle POST requests
export async function POST(req: Request): Promise<Response> {
	const actions: Action<any>[] = []; // Initialize an empty array to store actions
	// Check if the TAVILY_API_KEY environment variable is set
	if (process.env["TAVILY_API_KEY"]) {
		actions.push(scrapingAction); // Add the scraping action to the actions array
	}
	// Create a new instance of CopilotRuntime with the defined actions
	const copilotKit = new CopilotRuntime({
		actions: actions,
	});

	const openaiModel = process.env["OPENAI_MODEL"]; // Get the OpenAI model from environment variables

	// Return the response from CopilotKit, using the OpenAIAdapter with the specified model
	return copilotKit.response(req, new OpenAIAdapter({ model: openaiModel }));
}
