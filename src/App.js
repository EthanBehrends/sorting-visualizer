import './App.css'
import { Tabs, Tab } from '@material-ui/core'
import { useState } from 'react'
import SortBox from './SortBox'

function App() {
    const [algSel, setAlgSel] = useState(0);
    const [algName, setAlgName] = useState("Bubble Sort");
    const [numElements, setNumElements] = useState(30);
    const [array, setArray] = useState(genArray(numElements));
    const [comparisons, setComparisons] = useState(0);
    const [sorting, setSorting] = useState(false);
    const [runtime, setRuntime] = useState(0);
    const [inter, setInter] = useState();

    const handleChange = (e, v) => {
        setAlgSel(v);
        switch(v){
            case 0:
                setAlgName("Bubble Sort");
                break;
            case 1:
                setAlgName("Selection Sort");
                break;
            case 2:
                setAlgName("Insertion Sort");
                break;
            case 3:
                setAlgName("Merge Sort");
                break;
            case 4:
                setAlgName("QuickSort");
                break;
            default:
                setAlgName("Bubble Sort");
        }
    };

    const reset = () => {
        setSorting(false);
        clearInterval(inter);
        setArray(genArray(numElements));
        setComparisons(0);
        setRuntime(0);
    }

    const sort = (num) => {
        if(!sorting){
            setSorting(true);
            const start = Date.now();
            let choice;
            switch(num){
                case 0:
                    choice = bubbleSort;
                    break;
                case 1:
                    choice = selectionSort;
                    break;
                case 2:
                    choice = insertionSort;
                    break;
                case 3:
                    choice = mergeSort;
                    break;
                case 4:
                    choice = QuickSort;
                    break;
                default:
                    choice = bubbleSort;
            }
            const alg = choice(array);
            const algInt = setInterval(() => {
                const time = Date.now() - start;
                setRuntime((time/1000).toFixed(3));
                const next = alg.next();
                if(next.done) {
                    setSorting(false);
                    clearInterval(algInt);
                }
                else {
                    setComparisons(c=>c+1);
                    setArray([...next.value]);
                }
            },5)
            setInter(algInt);
        }
    }

    return (
        <>
            <div className="header">
                <h1>Sorting Algorithm Visualizer</h1>
            </div>
            <Tabs
                    value={algSel}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto">
                    <Tab label="Bubble Sort" />
                    <Tab label="Selection Sort" />
                    <Tab label="Insertion Sort" />
                    <Tab label="Merge Sort" />
                    <Tab label="QuickSort" />
                </Tabs>
            <div className="text">
                {((a) => {
                    switch(a) {
                        case 0:
                            return(
                                <>
                                <h1>Bubble Sort</h1>
                                <h3>Time Complexity: θ(n^2)</h3>
                                <p>Bubble Sort is an algorithm that sorts a given array by repeatedly moving the maximum unsorted value to the end of the unsorted portion.</p>
                                <p>The algorithm runs through the entire array, comparing adjacent values and swapping them if they are unsorted. This results in a visualization where the largest values appear to "bubble" towards the end of the array.</p>
                                </>
                            )
                        case 1:
                            return(
                                <>
                                <h1>Selection Sort</h1>
                                <h3>Time Complexity: θ(n^2)</h3>
                                <p>Selection Sort works by finding the smallest unsorted value and moving it to the front of the array.</p>
                                </>
                            )
                        case 2:
                            return(
                                <>
                                <h1>Insertion Sort</h1>
                                <h3>Time Complexity: θ(n^2)</h3>
                                <p>Insertion Sort produces a sorted array by inserting each element one at a time into its correct spot.</p>
                                <p>The array is effectively divided into a sorted and unsorted portion. For each element, the algorithm swaps it with its predecessor until it is in the correct spot.</p>
                                </>
                            )
                        case 3:
                            return(
                                <>
                                <h1>Merge Sort</h1>
                                <h3>Time Complexity: θ(n log(n))</h3>
                                <p>Merge Sort works by recursively merging sorted arrays.</p>
                                <p>The array is repeatedly divided in half until the divisions cannot be divided any further. Neighboring sections are then merged together like a zipper. This process is repeated until the entire array has been merged.</p>
                                </>
                            )
                        case 4:
                            return(
                                <>
                                <h1>QuickSort</h1>
                                <h3>Time Complexity: θ(n log(n))</h3>
                                <p>QuickSort selects a pivot, and repeatedly divides the array into partitions based on this pivot.</p>
                                <p>A pivot is selected, and the unsorted array is divided to where smaller values are placed to the left of the pivot, and the larger values are placed to the right. This same process can be applied recursively to both of these sections.</p>
                                </>
                            )
                        default:
                            return(<h1>Invalid Selection</h1>)
                    }
                })(algSel)}
            
            </div>

            <SortBox 
                sort={sort}
                array={array} 
                algSelected={algSel}
                algName={algName}
                runtime={runtime}
                comparisons={comparisons}
                reset={reset}
                numElements={numElements} 
                setNumElements={setNumElements} />
        </>
    )
}

function genArray(n) {
    let ret = [];
    for(let i = 0; i < n; i++) {
        ret[i] = i*(150/30);
    }
    return(shuffle(ret));
}

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function* bubbleSort(arr)
  {
    let i, j;
    let array = [...arr];
    for (i = 0; i < array.length-1; i++)
    {
        for (j = 0; j < array.length-i-1; j++)
        {
            if (array[j] > array[j+1])
            {
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
            yield array;
        }
    }
}

function* insertionSort(a) {
    let inputArr = [...a];
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (current < inputArr[j])) {
                inputArr[j+1] = inputArr[j];
                yield inputArr;
                j--;
            }
            inputArr[j+1] = current;
        }
    yield inputArr;
}

function* selectionSort(a)
{
    let arr = [...a];
    let i, j, min_idx;
 
    // One by one move boundary of unsorted subarray
    for (i = 0; i < arr.length-1; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;
        for (j = i + 1; j < arr.length; j++){
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
            yield arr;
        }
 
        // Swap the found minimum element with the first element
        let temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
    yield arr;
}



function* mergeSort(arr) {
    //Create two arrays for sorting
    let sorted = Array.from(arr);
    let n = sorted.length;
    let buffer = new Array(n);
    
    for (let size = 1; size < n; size *= 2) {
      for (let leftStart = 0; leftStart < n; leftStart += 2*size) {
        
        //Get the two sub arrays
        let left = leftStart,
            right = Math.min(left + size, n),
            leftLimit = right,
            rightLimit = Math.min(right + size, n);
        
        //Merge the sub arrays
        let i = left;
        while (left < leftLimit && right < rightLimit) {
            if (sorted[left] <= sorted[right]) {
              buffer[i++] = sorted[left++];
            } else {
              buffer[i++] = sorted[right++];
            }
            yield [...buffer, ...sorted.slice(buffer.length)]
          }
        
          //If there are elements in the left sub arrray then add it to the result
          while (left < leftLimit) {
            buffer[i++] = sorted[left++];
            yield [...buffer, ...sorted.slice(buffer.length)]
          }
        
          //If there are elements in the right sub array then add it to the result
          while (right < rightLimit) {
            buffer[i++] = sorted[right++];
            yield [...buffer, ...sorted.slice(buffer.length)]

          }
      }
      
      //Swap the sorted sub array and merge them
      let temp = sorted;
      sorted = buffer;
      buffer = temp;
    }
    
    yield sorted;
  }

  function* QuickSort(a){
    let arr = [...a];
    //Stack for storing start and end index
    let stack = [];
    
    //Get the start and end index
    let start = 0;
    let end = arr.length - 1;
    
    //Push start and end index in the stack
    stack.push({x: start, y: end});
    
    //Iterate the stack
    while(stack.length){
      //Get the start and end from the stack
      const { x, y } = stack.shift();
      
      //Partition the array along the pivot
      let pivot = arr[y];
        let i = x;
        
        //Partition the array into two parts using the pivot
        for(let j = x; j < y; j++){
            if(arr[j] <= pivot){      
                const temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp;
            i++;
            }
            yield arr;
        }
        const temp = arr[i]
        arr[i] = arr[y]
        arr[y] = temp;
      const PI = i;
      
      //Push sub array with less elements than pivot into the stack
      if(PI - 1 > x){
        stack.push({x: x, y: PI - 1});
      }
      
      //Push sub array with greater elements than pivot into the stack
      if(PI + 1 < y){
        stack.push({x: PI + 1, y: y});
      }
    }
    yield arr;
  }

export default App;