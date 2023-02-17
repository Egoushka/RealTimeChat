export class Message{
    public clientId: string;
    public type: string;
    public text: string;
    public date: Date;
    constructor(){
        this.clientId = '';
        this.type = '';
        this.text = '';
        this.date = new Date();
    }

}