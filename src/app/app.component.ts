import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

    // ########################################

    public gridCells: number[] = Array(100).fill(0);

    public gridColorCell: string[] = Array(100).fill('');

    public disabled = false;

    public time: number = 100;

    public winner: string = '';

    public showModal: boolean = false;

    public playerScore: number = 0;

    public computerScore: number = 0;

    // ########################################

    private selectedCell: number = -1;

    private timerID: number | null = null;


    // ########################################

    public startGame(): void {
        this.resetGame();
        this.generateRandomCell();
        this.startTimer();
    }

    public onClickCell(cellIndex: number): void {
        if (this.gridColorCell[cellIndex] === 'yellow') {
            this.gridColorCell[cellIndex] = 'green';
            this.playerScore++;
        }
    }

    public hideModal(): void {
        this.resetGame();

    }

    public resetGame(): void {
        clearInterval(this.timerID!);
        this.showModal = false;
        this.gridColorCell = Array(100).fill('');
        this.playerScore = 0;
        this.computerScore = 0;
        this.disabled = false;

    }

    // ########################################

    private checkWinner(): void {
        if (this.playerScore === 10 || this.computerScore === 10) {
            clearInterval(this.timerID!);
            this.showModal = true;
            this.winner = this.playerScore > this.computerScore ? 'Гравець' : `Комп'ютер`;
            return;
        }
        this.generateRandomCell();

    }

    private generateRandomCell(): void {
        do {
            this.selectedCell = Math.floor(Math.random() * 100);
        }
        while (this.gridColorCell[this.selectedCell] !== '');
        {
            this.gridColorCell[this.selectedCell] = 'yellow';
        }
    }

    private startTimer(): void {
        this.disabled = true;
        this.timerID = setInterval(() => {
            if (this.gridColorCell[this.selectedCell] === 'yellow') {
                this.gridColorCell[this.selectedCell] = 'red';
                this.computerScore++;
            }
            this.selectedCell = -1;
            this.checkWinner();

        }, this.time);
    }


    // ########################################

}