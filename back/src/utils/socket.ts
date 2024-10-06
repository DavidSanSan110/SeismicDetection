import { Socket, Server as SocketServer } from "socket.io";
import * as HTTP from "http";

export class SocketSingleton {

    private static instance: SocketSingleton = null;
    public io: SocketServer;
    public matrix_data: Number[][] = [[], [], [], [], [], []];
    public counter = 0;
    public start: Number[] = [];
    public end: Number[] = [];

    public static getInstance(): SocketSingleton {
        if (!SocketSingleton.instance) {
            return null;
        }
        return SocketSingleton.instance;
    }

    public static createInstance(server: HTTP.Server) {
        if (!SocketSingleton.instance) {
            SocketSingleton.instance = new SocketSingleton(server);
        }
    }

    private constructor(server: HTTP.Server) {
        this.io = new SocketServer(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                credentials: true
            }
        });

        console.log("Socket server running on port 10001");

        //Connect the user in a room with the user's id
        this.io.on("connection", (socket: Socket) => {
            console.log("User connected");

            socket.on("satellite_data", (data: any) => {
                //console.log("Event: " + event + " with data: " + JSON.stringify(data));
                //this.eventHandler.handleEvent(event, JSON.stringify(data));
                //data is a matrix of 6 vectors, append it to the matrix_data, when next data arrived, append first row to the first row of the matrix_data
                //console.log("Data: " + JSON.stringify(data));

                this.generateEvent2("data", data);

                for (let i = 0; i < data.length; i++) {
                    //this.matrix_data[i].push(data[i]);
                    //para cada elemento de data i, agregarlo a la fila i de matrix_data ten en cuenta que data[i] es un vector tienes que sacar los elementos de ese vector
                    this.matrix_data[i].push(...data[i]);
                }
                this.counter++;
                //print len of first row of matrix_data
                console.log(this.matrix_data[0].length);

                if (this.counter == 10) {
                    //prediccion
                    console.log("Prediccion");
                    this.counter = 0;
                    
                    let analysis = true;
                    for (let i = 0; i < this.matrix_data.length; i++) {
                        if (this.matrix_data[i].length < 30000) {
                            console.log("Not enough data for analysis");
                            analysis = false;
                            break;
                        }
                    }
                    //let matrix_data_filtered = this.matrix_data.map(row => row.slice(Math.max(row.length - 30000, 1)));
                    let matrix_data_filtered = null;

                    if (analysis) {
                        //send data to the server
                        console.log("Sending data to the server");
                        matrix_data_filtered = this.matrix_data.map(row => row.slice(-30000));
                        console.log("Each row has " + matrix_data_filtered[0].length + " elements");
                        console.log("First element time is " + matrix_data_filtered[0][0]);
                        console.log("Last element time is " + matrix_data_filtered[0][matrix_data_filtered[0].length - 1]);
                        
                        //for each row save the first and last element
                        this.start = matrix_data_filtered.map(row => row[0][0]);
                        this.end = matrix_data_filtered.map(row => row[row.length - 1][0]);
                        
                        fetch("http://{IP}:{PORT}/v1/api/example/detect_seism", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({matrices: matrix_data_filtered})
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    }
                }
            });

            socket.on("detection", (data: any) => {
                console.log("Detection: " + JSON.stringify(data));
                let prediction_data = []
                for (let i = 0; i < data.length; i++) {
                    let chunk = {
                        start: this.start[i],
                        end: this.end[i],
                        prediction: data[i]
                    }
                    prediction_data.push(chunk);
                }
                this.generateEvent2("prediction", prediction_data);
            });

            socket.on("disconnect", () => {
                console.log("User disconnected");
            });
        });
    }

    public generateEvent(event: string, data: any, room: string) {
        try {
            //console.log("Emitting event: " + event + " with data: " + JSON.stringify(data));
            this.io.to(room).emit(event, data);
        } catch (error) {
            //console.log("Error emitting event: " + event);
            console.log(error);
        }
    }

    public generateEvent2(event: string, data: any) {
        try {
            //console.log("Emitting event: " + event + " with data: " + JSON.stringify(data));
            this.io.emit(event, data);
        } catch (error) {
            //console.log("Error emitting event: " + event);
            console.log(error);
        }
    }


}