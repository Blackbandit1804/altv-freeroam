using System;
using System.Collections.Generic;
using System.Linq;

public static class Extension
{
    public static T Random<T>(this IEnumerable<T> enumerable)
    {
        return enumerable.ElementAt(new Random().Next(0, enumerable.Count()));
    }
}
