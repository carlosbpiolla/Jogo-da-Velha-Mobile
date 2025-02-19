import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image} from 'react-native';
import iconeVelha from './assets/velha.png';

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function handlePress(index) {
    if (board[index] || checkWinner() || isDraw()) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function isDraw() {
    return board.every(cell => cell !== null) && !checkWinner();
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  const winner = checkWinner();
  const draw = isDraw();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>
      <Image style={styles.icone} source={iconeVelha}/>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity key={index} style={styles.cell} onPress={() => handlePress(index)}>
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.status}>
        {winner ? `Vencedor: ${winner}` : draw ? 'Deu Velha!' : `Vez do: ${isXNext ? 'X' : 'O'}`}
      </Text>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>Reiniciar</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7b8a5a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  board: {
    width: 300,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cell: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white'
  },
  cellText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white'
  },
  status: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  resetText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  icone:{
    width: 150,
    height:150,
    marginTop: 10, marginBottom:10
  },
});
