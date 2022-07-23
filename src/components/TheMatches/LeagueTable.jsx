import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { positionsCollection } from "../../firebase";

const LeagueTable = () => {
  const [positions, setPositions] = useState(null);

  useEffect(() => {
    const getPositions = async () => {
      try {
        const docSnap = await getDocs(positionsCollection);

        const positions = docSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPositions(positions);
      } catch (error) {
        toast.error(error);
      }
    };
    if (!positions) {
      getPositions();
    }
  }, [positions]);

  const showTeamPositions = () =>
    positions?.map((pos, i) => (
      <TableRow key={pos.id}>
        <TableCell>{i + 1}</TableCell>
        <TableCell>{pos.team}</TableCell>
        <TableCell>{pos.w}</TableCell>
        <TableCell>{pos.l}</TableCell>
        <TableCell>{pos.d}</TableCell>
        <TableCell>{pos.pts}</TableCell>
      </TableRow>
    ));

  return (
    <div className="league_table_wrapper">
      <div className="title">League Table</div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pos</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>W</TableCell>
              <TableCell>L</TableCell>
              <TableCell>D</TableCell>
              <TableCell>Pts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{showTeamPositions()}</TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeagueTable;
