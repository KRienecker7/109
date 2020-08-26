export class Post {
    message: string;
    imageUrl: string;
    timeStamp: Date;
    from: string;
    to: string;

    constructor() {
        this.to = "Everyone";
        this.timeStamp = new Date();
    }
}
