using System;
using System.IO;

/**
 * Hi There!
 * This is the C# version of the Diagonal Difference problem.
 * I was build with .NET Core 2.1 version.
 */

/// Comments Pattern
/// https://docs.microsoft.com/pt-br/dotnet/csharp/language-reference/language-specification/documentation-comments

/// Directory 
/// https://docs.microsoft.com/pt-br/dotnet/api/system.io.directory?view=netcore-2.1

/// File
/// https://docs.microsoft.com/en-us/dotnet/api/system.io.file?view=netcore-2.1

namespace csharp
{
    class Program
    {
        // Get the input data
        static string[] GetInput(String example){
            
            // Specifing a file 
            var curDir = Directory.GetCurrentDirectory();
    
            // Calling the ReadAllLines() function 
            string[] readText = File.ReadAllLines(curDir+"\\..\\_input\\input"+example+".txt"); 
            return readText;
        }

        /// Process the data to be able to calculate the diffrence
        static int[,] ProcessData(String[] data){
            int size=0;
            int[,] matriz = new int[1, 1];

            bool isInt = Int32.TryParse(data[0], out size);

            if( isInt ){
                matriz = new int[size, size];

                for(int i=1; i<=size;i++)
                { 
                    var arrayValues = data[i].Split(" ");

                    for(int j=0; j<size;j++){
                        matriz[i-1,j] = Int32.Parse(arrayValues[j]);
                    }
                    
                } 
            }

            return matriz;
        }

        /// Calculate the difference
        static int DiagonalDifference(int[,] matriz){
            int response=0;
            int size = matriz.GetLength(0);

            for(int i=0; i<size; i++){
                response += matriz[i,i];
                response -= matriz[i,size-i-1];
            }

            return Math.Abs(response);
        }

        /// Save the result on a output file
        static void SaveResult(String example, int result){
            
            // Specifing a file 
            var curDir = Directory.GetCurrentDirectory();
            String path = curDir+"\\output";
            
            // Check if the directory exists.
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
    
            // Calling the ReadAllLines() function 
            File.WriteAllText(path+"\\output"+example+".txt", result.ToString()); 
        }

        static void Main(string[] args)
        {
            // Get the input file
            var data = GetInput(args[0]);

            // The the data processed
            var matriz = ProcessData(data);

            // Calculate the result
            var result = DiagonalDifference(matriz);
            
            // Save the result in the aoutpu file
            SaveResult(args[0] , result);
        }
    }
}
