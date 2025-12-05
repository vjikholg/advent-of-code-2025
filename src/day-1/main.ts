import puppeteer from "puppeteer";
import { Page, Browser } from "puppeteer";
import * as fs from 'fs'; 
const filepath : string = 'src/day-1/input.txt';


type MathHandler = {
    (a: number, b: number): number;
}

function add(a : number,b : number) : number { 
    return a + b;
}

function sub(a : number, b : number) : number { 
    return a - b; 
}

const FunctionHandler : Record<string, MathHandler> = {"L": sub, "R": add};

// now we'll use Regex and produce double iterator -> do the entire thing modulo 100 (0-99);

const digits : RegExp = /(\w)(\d+)/g; 

function main() { 
    const input : string = fs.readFileSync(filepath, 'utf-8'); 
    console.log(`input is: ${input.substring(0,20)}...`);

    const digitIterator : RegExpStringIterator<RegExpExecArray> = input.matchAll(digits); 
    const digitsArray : RegExpExecArray[] = Array.from(digitIterator); 


    let num : number = 50; // start 
    let count = 0; 
    

    for (const match of digitsArray) {
        num = FunctionHandler[match[1]]!(num, parseInt(match[2]!)) % 100; 
        
        if (num < 0) {
            num += 100;
        } else if (num === 0) count++; 
        
        console.log(num);
    }
    console.log(`number of times dial left at 0: ${count}`);
}

main(); 