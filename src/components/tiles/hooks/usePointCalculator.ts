import { useEffect, useState} from 'react';
import { API } from '../../../../src/api';

interface notificationDto {
    'title'?: string;
    'message'?: number[];
}

export const usePointCalculator = () => {
    const [chars, setChars] = useState<string[]>([]);
    const [score, setScore] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState<notificationDto>({});

    const resetTiles = () => {
		setChars([]);
	};

    const mapCharToScore = (char: string) => {
        // AEIOULNSTR -> 1
        // DG -> 2
        // BCMP -> 3
        // FHVWY -> 4
        // K -> 6
        // JX -> 8
        // QZ -> 10
        let score = 0;
        switch(char.toUpperCase()) {
            case 'A':
            case 'E':
            case 'I':
            case 'O':
            case 'U':
            case 'L':
            case 'N':
            case 'S':
            case 'T':
            case 'R':
                score = 1;
                break;
            case 'D':
            case 'G':
                score = 2;
                break;
            case 'B':
            case 'C':
            case 'M':
            case 'P':
                score = 3;
                break;
            case 'F':
            case 'H':
            case 'V':
            case 'W':
            case 'Y':
                score = 4;
                break;
            case 'K':
                score = 6;
                break;
            case 'J':
            case 'X':
                score = 8;
                break;
            case 'Q':
            case 'Z':
                score = 10;
                break;
            default:
                score = 0;
                break;

        }
        return score;
    }

    const getSum = (total: number, num: number) => {
        return total + num;
    }

    const calculateScore = (chars: string[]) => {
        setScore(chars.map(mapCharToScore).reduce(getSum, 0));
    }

    const saveScore = () => {
        API.scoreController.saveScore({score});
        setNotification({'title':'Score Saved'});
        setOpen(true)
	};

    const viewTopScores = async () => {
		const topTenScores = await API.scoreController.getTopTenScores();
        console.log(topTenScores.data);
        setNotification({'title':'Top 10 Scores:', 'message': topTenScores.data});
        setOpen(true)
	};

    const handleKeyDown = (e: any): void => {
        const keyInput : string = JSON.stringify(e.key);

        if (!"\"Backspace\"".localeCompare(keyInput)) {
            setChars((chars) => {return chars.length > 0 ? [...chars].slice(0,-1) : [];});
            console.log("4" + chars);
        } else if (keyInput.length == 3) {
            setChars((chars) => chars.length < 10 ?  [...chars, e.key] : chars);
        }
    }

    const handleClose = () => setOpen(false);
    
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        calculateScore(chars);
    }, [chars]);

    return {
        resetTiles,
        saveScore,
        viewTopScores,
        chars,
        score,
        open,
        handleClose,
        notification,
    };
};