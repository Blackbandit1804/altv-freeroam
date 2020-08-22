using System;

public static class Log
{
    public static void Write(object message) => Console.WriteLine($"[{DateTime.Now.TimeOfDay}] {message}");
}
