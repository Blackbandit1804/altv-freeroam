using AltV.Net;
using AltV.Net.EntitySync;

public sealed class Main : Resource
{
    public override void OnStart()
    {

    }

    public override void OnStop()
    {
        AltEntitySync.Stop();
        Timer.DeregisterAll();
    }
}
