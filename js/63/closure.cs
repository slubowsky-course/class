static Func<int, int> GetMultiplier(int x)
{
    var foo = "foo";

    return delegate (int y)
    {
        Console.WriteLine(foo);
        return x * y;
    };
}

var multiplyByFive = GetMultiplier(5);
Console.WriteLine(multiplyByFive(5));

var multiplyByTen = GetMultiplier(10);
Console.WriteLine(multiplyByTen(5));

Console.WriteLine(GetMultiplier(2)(10));
