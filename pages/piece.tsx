import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import styled from 'styled-components'

// export const PieceType = {
//   None: 0,
//   Hiyoko: 1,
//   Kirin: 2,
//   Zou: 3,
//   Lion: 4,
// } as const

// type PieceType = typeof PieceType[keyof typeof PieceType]

//TODO 相手駒のTypeを定義する
//TODO enum依存脱却

enum PieceType {
  None = 0,
  Hiyoko = 1,
  Kirin = 2,
  Zou = 3,
  Lion = 4,
  Player2Hiyoko = -1,
  Player2Kirin = -2,
  Player2Zou = -3,
  Player2Lion = -4,
  Highlight = 100,
}

//interfaceに駒の情報を定義する
interface Pieceinfo {
  Piecetype: PieceType
}

export const LionPiece = styled.div`
  background-color: transparent;
  width: 160px;
  height: 160px;
  display: grid;
  background-image: url(./lion.png);
  background-size: 160px 160px;
`

export const HiyokoPiece = styled.div`
  background-color: transparent;
  width: 160px;
  height: 160px;
  display: grid;
  background-image: url(./hiyoko.png);
  background-size: 160px 160px;
`
export const KirinPiece = styled.div`
  background-color: transparent;
  width: 160px;
  height: 160px;
  display: grid;
  background-image: url(./kirin.png);
  background-size: 160px 160px;
`
export const ZouPiece = styled.div`
  background-color: transparent;
  width: 160px;
  height: 160px;
  display: grid;
  background-image: url(./zou.png);
  background-size: 160px 160px;
`
export const NonePiece = styled.div`
  background-color: transparent;
  width: 160px;
  height: 160px;
  display: grid;
`

export const Player2LionPiece = styled.div`
  background-color: transparent;
  width: 160px;
  height: 160px;
  display: grid;
  background-image: url(./lion.png);
  background-size: 160px 160px;
  transform: rotate(180deg);
`
export const Player2HiyokoPiece = styled.div`
  background-color: transparent;
  width: 160px;
  height: 160px;
  display: grid;
  background-size: 160px 160px;
  background-image: url(./hiyoko.png);
  transform: rotate(180deg);
`
export const Player2KirinPiece = styled.div`
  background-color: transparent;
  width: 160px;
  height: 160px;
  display: grid;
  background-size: 160px 160px;
  background-image: url(./kirin.png);
  transform: rotate(180deg);
`
export const Player2ZouPiece = styled.div`
  background-color: transparent;
  width: 160px;
  height: 160px;
  display: grid;
  background-size: 160px 160px;
  background-image: url(./zou.png);
  transform: rotate(180deg);
`

export const HighlightPiece = styled.div`
  background-color: transparent;
  width: 160px;
  height: 160px;
  display: grid;
  background-color: yellow;
`

//TODO 相手駒のCSSを作る

export const Piece = (props: Pieceinfo) => {
  return (
    <div>
      {props.Piecetype === PieceType.Lion && <LionPiece />}
      {props.Piecetype === PieceType.Hiyoko && <HiyokoPiece />}
      {props.Piecetype === PieceType.Kirin && <KirinPiece />}
      {props.Piecetype === PieceType.Zou && <ZouPiece />}
      {props.Piecetype === PieceType.Player2Lion && <Player2LionPiece />}
      {props.Piecetype === PieceType.Player2Hiyoko && <Player2HiyokoPiece />}
      {props.Piecetype === PieceType.Player2Kirin && <Player2KirinPiece />}
      {props.Piecetype === PieceType.Player2Zou && <Player2ZouPiece />}
      {props.Piecetype === PieceType.Highlight && <HighlightPiece />}
      {props.Piecetype === PieceType.None && <NonePiece />}
    </div>
  )
}
