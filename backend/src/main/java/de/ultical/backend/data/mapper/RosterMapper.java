/**
 * Copyright (C) 2015-2016 ultical contributors
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * If the program is linked with libraries which are licensed under one of the
 * following licenses, the combination of the program with the linked library is
 * not considered a "derivative work" of the program:
 *
 * * Apache License, version 2.0
 * * Apache Software License, version 1.0
 * * Mozilla Public License, versions 1.0, 1.1 and 2.0
 * * Common Development and Distribution License (CDDL), version 1.0
 *
 * Therefore the distribution of the program linked with libraries licensed under
 * the aforementioned licenses, is permitted by the copyright holders if the
 * distribution is compliant with both the GNU Affero General Public License
 * version 3 and the aforementioned licenses.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the  GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package de.ultical.backend.data.mapper;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import de.ultical.backend.model.Player;
import de.ultical.backend.model.Roster;
import de.ultical.backend.model.TeamRegistration;

public interface RosterMapper extends BaseMapper<Roster> {

    final String SELECT_STMT = "SELECT id, version, team, season, division_age as divisionAge, division_type as divisionType FROM ROSTER";

    // INSERT
    @Override
    @Insert("INSERT INTO ROSTER (team, season, division_age, division_type) VALUES (#{team.id},#{season.id},#{divisionAge},#{divisionType})")
    @Options(keyProperty = "id", useGeneratedKeys = true)
    Integer insert(Roster entity);

    @Insert("INSERT INTO ROSTER_PLAYERS (roster, player) VALUES (#{roster.id}, #{player.id})")
    Integer addPlayer(@Param("roster") Roster roster, @Param("player") Player player);

    // UPDATE
    @Override
    @Update("UPDATE ROSTER SET team = #{team.id}, season = #{season.id}, division_age = #{divisionAge}, division_type = #{divisionType} WHERE id = #{id} AND version = #{version}")
    Integer update(Roster entity);

    // DELETE
    @Override
    @Delete("DELETE FROM ROSTER WHERE id=#{rosterId}")
    void delete(int rosterId);

    // SELECT
    @Override
    @Select({ SELECT_STMT, "WHERE id = #{id}" })
    @Results({ @Result(column = "id", property = "id"), @Result(column = "version", property = "version"),
            @Result(column = "division_age", property = "division_age"),
            @Result(column = "division_type", property = "division_type"),
            @Result(column = "team", property = "team", one = @One(select = "de.ultical.backend.data.mapper.TeamMapper.get") ),
            @Result(column = "season", property = "season", one = @One(select = "de.ultical.backend.data.mapper.SeasonMapper.get") ),
            @Result(column = "id", property = "players", many = @Many(select = "de.ultical.backend.data.mapper.RosterPlayerMapper.getByRoster") ) })
    Roster get(int id);

    @Override
    @Select(SELECT_STMT)
    @Results({ @Result(column = "id", property = "id"), @Result(column = "version", property = "version"),
            @Result(column = "division_age", property = "division_age"),
            @Result(column = "division_type", property = "division_type"),
            @Result(column = "season", property = "season", one = @One(select = "de.ultical.backend.data.mapper.SeasonMapper.get") ),
            @Result(column = "id", property = "players", many = @Many(select = "de.ultical.backend.data.mapper.RosterPlayerMapper.getByRoster") ) })
    List<Roster> getAll();

    @Select({ SELECT_STMT, "WHERE team = #{teamId}" })
    @Results({ @Result(column = "id", property = "id"), @Result(column = "version", property = "version"),
            @Result(column = "division_age", property = "division_age"),
            @Result(column = "division_type", property = "division_type"),
            @Result(column = "season", property = "season", one = @One(select = "de.ultical.backend.data.mapper.SeasonMapper.get") ),
            @Result(column = "id", property = "players", many = @Many(select = "de.ultical.backend.data.mapper.RosterPlayerMapper.getByRoster") ) })
    List<Roster> getForTeam(Integer teamId);

    // get roster of a specific team in one season to check for
    // roster uniqueness
    @Select({ SELECT_STMT,
            "WHERE team = #{teamId} AND season = #{seasonId} AND division_age = #{divisionAge} AND division_type = #{divisionType}" })
    @Results({ @Result(column = "id", property = "id"), @Result(column = "version", property = "version") })
    Roster getByTeamSeasonDivision(@Param("teamId") Integer teamId, @Param("seasonId") Integer seasonId,
            @Param("divisionAge") String divisionAge, @Param("divisionType") String divisionType);

    // get roster that contains specific player in one season to check for
    // player uniqueness
    @Select({ SELECT_STMT,
            "LEFT JOIN ROSTER_PLAYERS rp ON ROSTER.id = rp.roster WHERE rp.player = #{playerId} AND ROSTER.season = #{seasonId} AND division_age = #{divisionAge} AND division_type = #{divisionType}" })
    @Results({ @Result(column = "id", property = "id"), @Result(column = "version", property = "version") })
    List<Roster> getByPlayerSeasonDivision(@Param("playerId") Integer playerId, @Param("seasonId") Integer seasonId,
            @Param("divisionAge") String divisionAge, @Param("divisionType") String divisionType);

    // combine getBlockingDate and getByPlayerSeasonDivision and check if a
    // player is eligable to be added to a roster - either because she is not
    // yet on a roster for this season, divisionage/-type or because her team
    // failed to qualify on their first attempt
    @Select({ "SELECT tr.id FROM TEAM_REGISTRATION tr JOIN TEAM t ON tr.team = t.id", "JOIN ROSTER r ON r.team = t.id",
            "WHERE tr.status = 'CONFIRMED' AND tr.not_qualified = false AND r.id", "IN (SELECT ROSTER.id FROM ROSTER",
            "LEFT JOIN ROSTER_PLAYERS rp ON ROSTER.id = rp.roster",
            "WHERE rp.player = #{playerId} AND ROSTER.season = #{seasonId} AND division_age = #{divisionAge} AND division_type = #{divisionType})" })
    @Results({ @Result(column = "id", property = "id"), @Result(column = "version", property = "version") })
    List<TeamRegistration> getTrByPlayerSeasonDivisionQualified(@Param("playerId") Integer playerId,
            @Param("seasonId") Integer seasonId, @Param("divisionAge") String divisionAge,
            @Param("divisionType") String divisionType);

    // get blocking date for roster
    @Select({ "SELECT e.start_date AS blockingDate FROM EVENT e",
            "JOIN TOURNAMENT_EDITION te ON e.tournament_edition = te.id JOIN DIVISION_REGISTRATION dr ON dr.tournament_edition = te.id",
            "JOIN TEAM_REGISTRATION tr ON tr.division_registration = dr.id JOIN TEAM t ON tr.team = t.id",
            "JOIN ROSTER r ON r.team = t.id AND r.season = te.season AND r.division_age = dr.division_age AND r.division_type = dr.division_type",
            "WHERE tr.status = 'CONFIRMED' AND tr.not_qualified = false AND r.id = #{rosterId}" })
    List<LocalDate> getBlockingDate(int rosterId);
}
