// Sends information to the the process.
const sendToProcess = (eventType: string, ...data: any[]): Promise<void> => {
    return window.ipc.sendToProcess(eventType, data);
}

const loadURL: string = "https://www.nexus-app.net/marketplace";
window.ipc.onProcessEvent((eventType: string, data: any[]) => {
    switch (eventType) {
        case "user-agent": {
            // Create the webview
            const { userAgent, partition } = data[0];

            const html: string = `
                <webview 
                    src="${loadURL}"
                    partition="${partition}" 
                    userAgent="${userAgent}"
                ></webview>
            `
            document.getElementById("app").insertAdjacentHTML('beforeend', html);

            const webview = document.getElementById('webview');
            webview.addEventListener('dom-ready', () => {
                (webview as any).insertCSS(`
                    ::-webkit-scrollbar {
                        width: 0.75rem;
                    }
                    ::-webkit-scrollbar-button {
                        display: none;
                    }
                    ::-webkit-scrollbar-track-piece {
                        background: transparent;
                        
                    }
                    ::-webkit-scrollbar-thumb {
                        background: gray;
                    }`)

            })
            break;
        }
        default: {
            console.warn(`Uncaught message: ${eventType} | ${data}`);
            break;
        }
    }
});
sendToProcess("init");


