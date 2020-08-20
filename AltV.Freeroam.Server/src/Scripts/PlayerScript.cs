using AltV.Net;
using AltV.Net.Data;
using AltV.Net.Elements.Entities;
using AltV.Net.Enums;

public sealed class PlayerScript : IScript
{
    private Position SpawnPosition { get; set; } = new Position(-58.8f, -146.3f, 56.3f);

    [ScriptEvent(ScriptEventType.PlayerConnect)]
    public void OnPlayerConnect(IPlayer player, string reason)
    {
        player.Model = (uint)PedModel.FreemodeMale01;
        player.Spawn(SpawnPosition);
    }
}