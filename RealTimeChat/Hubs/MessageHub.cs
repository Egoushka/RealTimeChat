using Microsoft.AspNetCore.SignalR;
using RealTimeChat.Data;

namespace RealTimeChat.Hubs;

public class MessageHub : Hub  
{  
    public async Task NewMessage(Message msg)  
    {  
        await Clients.All.SendAsync("MessageReceived", msg);  
    }  
}  