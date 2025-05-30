// Sends information to the the process.
const sendToProcess = (eventType: string, ...data: any[]): Promise<void> => {
    return window.ipc.sendToProcess(eventType, data);
}

const url: string = "https://www.nexus-app.net/marketplace";
window.ipc.onProcessEvent((eventType: string, data: any[]) => {
    switch (eventType) {
        case "user-agent": {
            // Create the webview
            const { userAgent, partition } = data[0];

            const html: string = `
                <webview 
                    allowpopups 
                    src="${url}"
                    partition="${partition}" 
                    userAgent="${userAgent}"
                ></webview>
            `
            document.getElementById("app").insertAdjacentHTML('beforeend', html);
            break;
        }
        default: {
            console.warn(`Uncaught message: ${eventType} | ${data}`);
            break;
        }
    }
});
sendToProcess("init");


