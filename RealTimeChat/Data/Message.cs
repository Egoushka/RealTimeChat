namespace RealTimeChat.Data;

public class Message
{
    public string ClientId { get; set; }  
    public string Type { get; set; }  
    public string Text { get; set; }  
    public DateTime Date { get; set; }  
}