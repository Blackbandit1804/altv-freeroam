using System;
using System.Collections.Generic;

public static class Timer
{
    private static IDictionary<int, System.Threading.Timer> RegisteredTimers { get; } = new Dictionary<int, System.Threading.Timer>();

    public static int Register(Action value, TimeSpan period)
    {
        var timer = new System.Threading.Timer((e) => value.Invoke(), null, TimeSpan.Zero, period);
        RegisteredTimers.Add(timer.GetHashCode(), timer);
        return timer.GetHashCode();
    }

    public static void Deregister(int handle)
    {
        RegisteredTimers[handle].Dispose();
        RegisteredTimers.Remove(handle);
    }

    public static void DeregisterAll() => RegisteredTimers.Clear();
}
