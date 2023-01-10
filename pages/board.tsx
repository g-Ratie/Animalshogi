import { background } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Piece } from './piece'

export const PieceType = {
  None: 0,
  Hiyoko: 1,
  Kirin: 2,
  Zou: 3,
  Lion: 4,
  Player2Hiyoko: -1,
  Player2Kirin: -2,
  Player2Zou: -3,
  Player2Lion: -4,
  Highlight: 100,
} as const

type PieceType = typeof PieceType[keyof typeof PieceType]

const PieceGetmoveplace = {
  Lion: [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ],
  Hiyoko: [[1, 0]],
  Kirin: [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ],
  Zou: [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ],
  Player2Hiyoko: [[0, -1]],
  None: [],
}

export const StyledSquare = styled.button`
  background-color: transparent;
  padding: 10px;
  width: 200px;
  height: 200px;
  display: grid;
`
export const Container = styled.div`
  display: grid;
  width: 600px;
  height: 800px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  position: absolute;
  background: rgb(18, 255, 39);
  background: linear-gradient(
    0deg,
    rgba(18, 255, 39, 1) 0%,
    rgba(230, 255, 122, 1) 30%,
    rgba(255, 252, 122, 1) 50%,
    rgba(255, 252, 122, 1) 70%,
    rgba(3, 222, 237, 1) 100%
  );
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
export const Mainarea = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid black;
  //isHighlight: boolean
`

const InitialBoardData = [
  [-2, -4, -3],
  [0, -1, 0],
  [0, 1, 0],
  [3, 4, 2],
]

const toPieceType = (board: number[][], i: number, j: number) => {
  if (board[i][j] === 1) {
    return 'Hiyoko'
  }
  if (board[i][j] === 2) {
    return 'Kirin'
  }
  if (board[i][j] === 3) {
    return 'Zou'
  }
  if (board[i][j] === 4) {
    return 'Lion'
  }
  if (board[i][j] === -1) {
    return 'Player2Hiyoko'
  } else {
    return 'None'
  }
}

const Getmoveplace = (board: number[][], i: number, j: number) => {
  const piece: number = board[i][j]
  const pieceType = toPieceType(board, i, j)
  const canmovePlace: number[][] = PieceGetmoveplace[pieceType]
  const result: number[][] = []
  canmovePlace.forEach((place) => {
    const newi = i + place[0]
    const newj = j + place[1]
    if (newi >= 0 && newi < 4 && newj >= 0 && newj < 3) {
      if (board[newi][newj] === 0) {
        result.push([newi, newj])
      }
      //もしくは移動さきが敵の駒だったら
    }
  })
  return result
}

const checkPlayerPiece = (
  turn: number,
  board: number[][],
  i: number,
  j: number
) => {
  if (turn % 2 === 0) {
    if (board[i][j] > 0 && board[i][j] !== 100) {
      return true
    }
  } else {
    if (board[i][j] < 0 && board[i][j] !== 100) {
      return true
    }
  }
}
const Highlight = (board: number[][], i: number, j: number) => {
  //ハイライトの初期化
  ResetHighlight(board)
  const highlighPlace = Getmoveplace(board, i, j)
  const highlightboard = board.slice(0, board.length)
  highlighPlace.forEach((place) => {
    highlightboard[place[0]][place[1]] = 100
  })
  return highlightboard
}

const ResetHighlight = (board: number[][]) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === 100) {
        board[i][j] = 0
      }
    }
  }
}
export const Board: NextPage = () => {
  const [board, setBoard] = useState(InitialBoardData)
  const [turn, setTurn] = useState(0)
  const [clickedpiece, setClickedpiece] = useState(0)
  const [clickedpieceplace, setClickedpieceplace] = useState<number[]>([0, 0])
  return (
    <Container>
      {board.map((row: number[], i: number) => {
        return row.map((square: number, j: number) => {
          return (
            <Mainarea key={`${i}-${j}`}>
              <StyledSquare
                onClick={() =>
                  //もし、自分のコマをクリックしたら、移動可能な場所をハイライトする
                  {
                    //自分のコマかどうか
                    if (checkPlayerPiece(turn, board, i, j) === true) {
                      setClickedpiece(board[i][j])
                      const highlightboard = Highlight(board, i, j)
                      setBoard(highlightboard)
                      setClickedpieceplace([i, j])
                    }
                    //もしクリックしたセルがハイライトされていたら、そこにコマを置く
                    if (board[i][j] === 100) {
                      const newboard = board
                      newboard[i][j] = clickedpiece
                      console.log(newboard)
                      newboard[clickedpieceplace[0]][clickedpieceplace[1]] = 0
                      //奇数ターンでバグる
                      setBoard(newboard)
                      setTurn(turn + 1)
                      setClickedpiece(0)
                      setClickedpieceplace([0, 0])
                      ResetHighlight(board)
                    } else {
                      alert('それは有効な選択ではありません')
                    }
                  }
                }
              >
                <Piece Piecetype={board[i][j]} />
              </StyledSquare>
            </Mainarea>
          )
        })
      })}
      <div>ターン:{turn}</div>
    </Container>
  )
}

export default Board
