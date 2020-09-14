<?php


function get_input( $filepath ){
    $contents='';
    if(is_file($filepath)){
        $contents = file_get_contents($filepath);
    }
    else{
        echo 'The input file '.$filepath.' do not exists.';
    }
    return $contents;
}

function break_data($input){

    // explode the input lines in one array
    $lines = explode( "\n", $input );
    $arr=[];


    // Break data in array
    for ($i=1; $i < count($lines) ; $i++) { 
        $arr[]=explode(" ",$lines[$i]);
    }

    return $arr;
}


/*
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */
function diagonal_difference( $arr ) {

    $sum = 0;
    for( $i=0; $i<count($arr); $i++ ){
        if( is_Array($arr[$i]) ){
            $sum+=$arr[$i][$i];
            $sum-=$arr[$i][count($arr)-$i-1];
        }
    }

    // returns the absolute
    return abs($sum);
}

function output($filepath, $result){

    try {
        // Check if the directory exists, if not, creates it
        if(!is_dir('output')) mkdir('output');

        // save the response
        $fp = fopen('output/'.$filepath, 'w');
        fwrite($fp, $result);
        fclose($fp);
    } catch (\Throwable $th) {
        throw $th;
    }
}

function main() {

    global $argv;

    $example = $argv[1];

    // creates the result/output file
    
    // Input file passed by stdin
    // php script.php < ..\_input\input00.txt
    // $contents = stream_get_contents(STDIN);

    $contents = get_input('../_input/input'.$example.'.txt');
    
    // if file input exists
    if($contents){
        $contents = break_data($contents);

        $sum = diagonal_difference($contents);

        $response = output( date('Ymdhis').'output'.$example.'.txt',$sum);
    }

}

main();