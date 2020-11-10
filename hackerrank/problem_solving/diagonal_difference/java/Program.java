// File Manipulation
import java.io.File;  
import java.io.FileInputStream;  
import java.io.FileOutputStream;  
import java.io.OutputStreamWriter;

// Error Handlers
import java.io.FileNotFoundException;  
import java.io.IOException;

// To read and write the UTF8 files
// https://docs.oracle.com/javase/7/docs/api/java/nio/charset/StandardCharsets.html
import java.nio.charset.StandardCharsets;

// To get the current timestamp to generate the output name file
// https://docs.oracle.com/javase/8/docs/api/java/time/LocalDateTime.html
import java.time.LocalDateTime;

// Path and Paths
// https://docs.oracle.com/javase/7/docs/api/java/nio/file/Paths.html
import java.nio.file.*;

/**
 * Developed to be able to read the input data, calculate the diagonal difference
 * and output the result in the UTF8 format
 */
public class Program{
    
    public static String getInput(String filePath){
        // Data types in java
        // https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html
        byte[] data = new byte[0];
        String response="";

        try {
            File file = new File(filePath);
            FileInputStream fis = new FileInputStream(file);
            data = new byte[(int) file.length()];
            fis.read(data);
            fis.close();

            response = new String(data, StandardCharsets.UTF_8);


        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }catch(Exception e){
            System.out.println("An error occurred.");
            e.printStackTrace();
        }

        return response;
    }

    public static int[][] prepareData(String data){
        int size=0;
        String[] lines = data.split("\n");
        int[][] response;

        size = Integer.parseInt(lines[0]);
        response = new int[size][size];

        for(int i=1; i<=size; i++){
            String[] lineSplit = lines[i].split(" ");
            
            for(int j=0; j<size; j++){
                response[i-1][j] = Integer.parseInt(lineSplit[j]);
            }
        }

        return response;
    }

    public static int diagonalDifference(int[][] matriz){
        int response = 0;

        for(int i=0; i< matriz.length; i++){
            response += matriz[i][i];
            response -= matriz[i][matriz.length-1-i];
        }

        response = Math.abs(response);

        return response;
    }

    public static boolean saveOutput(String example,int difference){
        // Data types in java
        // https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html
        boolean response=true;

        LocalDateTime now = LocalDateTime.now();
        String formatedDate = now.toString().replace("-","").replace(":","").replace("T","").substring(0,14);
        String outputFilePath = "output"+File.separator+formatedDate+"output"+example+".txt";

        try {
            
            // get this current directory full path
            Path currentRelativePath = Paths.get("");
            String dirPath = currentRelativePath.toAbsolutePath().toString();
            
            // Creates the directory, if it doesn't exists
            File file = new File(dirPath+File.separator+"output");
            if(!file.exists()) file.mkdir();

            // write the result
            OutputStreamWriter writer = new OutputStreamWriter(new FileOutputStream(dirPath+File.separator+outputFilePath), StandardCharsets.UTF_8);
            writer.write(String.valueOf(difference));
            writer.close();
            
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
            response=false;
        }catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
            response=false;
        }

        return response;
    }

    public static void main(String[] args) {
        
        String exampleName = args[0];
        int difference = 0;
        int[][] data;

        String inputFilePath = "../_input/input"+exampleName+".txt";
        String content = getInput(inputFilePath);

        if( content.length()>0 ){
            data = prepareData(content);

            difference = diagonalDifference(data);

            saveOutput(exampleName ,difference);
        }
    }
}