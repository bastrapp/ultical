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

import de.ultical.backend.model.Contact;
import de.ultical.backend.model.Event;
import de.ultical.backend.model.Team;
import de.ultical.backend.model.TeamRegistration;
import de.ultical.backend.model.User;

public interface EventMapper extends BaseMapper<Event> {

    // INSERT
    @Override
    @Insert({
            "INSERT INTO EVENT (matchday_number, tournament_edition, start_date, end_date, local_organizer, info, name) VALUES",
            "(#{matchdayNumber, jdbcType=INTEGER},#{tournamentEdition.id, jdbcType=INTEGER},#{startDate, jdbcType=DATE},#{endDate, jdbcType=DATE},#{localOrganizer.id, jdbcType=INTEGER}, #{info, jdbcType=VARCHAR}, #{name, jdbcType=VARCHAR})" })
    @Options(keyProperty = "id", useGeneratedKeys = true)
    Integer insert(Event event);

    @Insert("INSERT INTO EVENT_ULTICAL_USERS (event, admin) VALUES (#{event.id},#{user.id})")
    public Integer insertAdmin(@Param("event") Event event, @Param("user") User user);

    // UPDATE
    @Override
    @Update({ "UPDATE EVENT SET version=version+1, tournament_edition=#{tournamentEdition.id},",
            "start_date=#{startDate}, end_date=#{endDate}, name=#{name, jdbcType=VARCHAR},",
            "local_organizer=#{localOrganizer.id, jdbcType=INTEGER}, info=#{info, jdbcType=VARCHAR}",
            "WHERE version=#{version} AND id=#{id}" })
    Integer update(Event entity);

    // DELETE
    @Override
    @Delete("DELETE FROM EVENT WHERE id=#{id}")
    void delete(Event entity);

    @Delete("DELETE FROM EVENT_ULTICAL_USERS WHERE event=#{event.id} AND admin=#{user.id}")
    public void deleteAdmin(@Param("event") Event event, @Param("user") User user);

    @Delete("DELETE FROM EVENT_ULTICAL_USERS WHERE event = #{event.id}")
    void removeAllAdmins(@Param("event") Team event);

    // SELECT
    @Override
    @Select("SELECT * FROM EVENT WHERE id = #{id}")
    @Results({ @Result(column = "matchday_number", property = "matchdayNumber"),
            @Result(column = "id", property = "id"), @Result(column = "version", property = "version"),
            @Result(column = "tournament_edition", property = "tournamentEdition", one = @One(select = "de.ultical.backend.data.mapper.TournamentEditionMapper.getForEvent")),
            @Result(column = "id", property = "locations", many = @Many(select = "de.ultical.backend.data.mapper.LocationMapper.getForEvent")),
            @Result(column = "start_date", property = "startDate"), @Result(column = "end_date", property = "endDate"),
            @Result(column = "info", property = "info"), @Result(column = "name", property = "name"),
            @Result(column = "id", property = "admins", many = @Many(select = "de.ultical.backend.data.mapper.UserMapper.getAdminsForEvent")),
            @Result(column = "id", property = "fees", many = @Many(select = "de.ultical.backend.data.mapper.FeeMapper.getForEvent")),
            @Result(column = "id", property = "resources", many = @Many(select = "de.ultical.backend.data.mapper.ResourceMapper.getForEvent")),
            @Result(column = "id", property = "divisionConfirmations", many = @Many(select = "de.ultical.backend.data.mapper.DivisionConfirmationMapper.getByEvent")),
            @Result(column = "local_organizer", property = "localOrganizer", one = @One(select = "de.ultical.backend.data.mapper.ContactMapper.get"), javaType = Contact.class) })
    Event get(int id);

    @Override
    @Select("SELECT * FROM EVENT")
    @Results({ @Result(column = "matchday_number", property = "matchdayNumber"),
            @Result(column = "id", property = "id"), @Result(column = "version", property = "version"),
            @Result(column = "tournament_edition", property = "tournamentEdition", one = @One(select = "de.ultical.backend.data.mapper.TournamentEditionMapper.getForEvent")),
            @Result(column = "id", property = "locations", many = @Many(select = "de.ultical.backend.data.mapper.LocationMapper.getForEvent")),
            @Result(column = "start_date", property = "startDate"), @Result(column = "end_date", property = "endDate"),
            @Result(column = "info", property = "info"), @Result(column = "name", property = "name"),
            @Result(column = "id", property = "admins", many = @Many(select = "de.ultical.backend.data.mapper.UserMapper.getAdminsForEvent")),
            @Result(column = "id", property = "fees", many = @Many(select = "de.ultical.backend.data.mapper.FeeMapper.getForEvent")),
            @Result(column = "id", property = "resources", many = @Many(select = "de.ultical.backend.data.mapper.ResourceMapper.getForEvent")),
            @Result(column = "id", property = "divisionConfirmations", many = @Many(select = "de.ultical.backend.data.mapper.DivisionConfirmationMapper.getByEvent")),
            @Result(column = "local_organizer", property = "localOrganizer", one = @One(select = "de.ultical.backend.data.mapper.ContactMapper.get"), javaType = Contact.class) })
    List<Event> getAll();

    @Select("SELECT * FROM EVENT")
    @Results({ @Result(column = "matchday_number", property = "matchdayNumber"),
            @Result(column = "id", property = "id"), @Result(column = "version", property = "version"),
            @Result(column = "tournament_edition", property = "tournamentEdition", one = @One(select = "de.ultical.backend.data.mapper.TournamentEditionMapper.getBasicForEvent")),
            @Result(column = "id", property = "locations", many = @Many(select = "de.ultical.backend.data.mapper.LocationMapper.getForEvent")),
            @Result(column = "start_date", property = "startDate"), @Result(column = "end_date", property = "endDate"),
            @Result(column = "info", property = "info"), @Result(column = "name", property = "name"),
            @Result(column = "id", property = "divisionConfirmations", many = @Many(select = "de.ultical.backend.data.mapper.DivisionConfirmationMapper.getBasicsByEvent")) })
    List<Event> getAllBasics();

    @Select("SELECT * FROM EVENT WHERE tournament_edition=#{editionId}")
    @Results({ @Result(column = "matchday_number", property = "matchdayNumber"),
            @Result(column = "id", property = "id"), @Result(column = "version", property = "version"),
            @Result(column = "id", property = "locations", many = @Many(select = "de.ultical.backend.data.mapper.LocationMapper.getForEvent")),
            @Result(column = "start_date", property = "startDate"), @Result(column = "end_date", property = "endDate"),
            @Result(column = "info", property = "info"), @Result(column = "name", property = "name"),
            @Result(column = "id", property = "admins", many = @Many(select = "de.ultical.backend.data.mapper.UserMapper.getAdminsForEvent")),
            @Result(column = "id", property = "fees", many = @Many(select = "de.ultical.backend.data.mapper.FeeMapper.getForEvent")),
            @Result(column = "id", property = "resources", many = @Many(select = "de.ultical.backend.data.mapper.ResourceMapper.getForEvent")),
            @Result(column = "id", property = "divisionConfirmations", many = @Many(select = "de.ultical.backend.data.mapper.DivisionConfirmationMapper.getByEvent")),
            @Result(column = "local_organizer", property = "localOrganizer", one = @One(select = "de.ultical.backend.data.mapper.ContactMapper.get"), javaType = Contact.class) })
    List<Event> getEventsForEdition(int editionId);

    @Select("SELECT * FROM EVENT e JOIN TOURNAMENT_EDITION te ON te.event = e.id JOIN DIVISION_REGISTRATION dr ON dr.tournament_edition = te.id WHERE dr.id=#{divisionId}")
    @Results({ @Result(column = "matchday_number", property = "matchdayNumber"),
            @Result(column = "id", property = "id"), @Result(column = "version", property = "version"),
            @Result(column = "id", property = "locations", many = @Many(select = "de.ultical.backend.data.mapper.LocationMapper.getForEvent")),
            @Result(column = "start_date", property = "startDate"), @Result(column = "end_date", property = "endDate"),
            @Result(column = "info", property = "info"), @Result(column = "name", property = "name"),
            @Result(column = "id", property = "admins", many = @Many(select = "de.ultical.backend.data.mapper.UserMapper.getAdminsForEvent")),
            @Result(column = "id", property = "fees", many = @Many(select = "de.ultical.backend.data.mapper.FeeMapper.getForEvent")),
            @Result(column = "id", property = "resources", many = @Many(select = "de.ultical.backend.data.mapper.ResourceMapper.getForEvent")),
            @Result(column = "id", property = "divisionConfirmations", many = @Many(select = "de.ultical.backend.data.mapper.DivisionConfirmationMapper.getByEvent")),
            @Result(column = "local_organizer", property = "localOrganizer", one = @One(select = "de.ultical.backend.data.mapper.ContactMapper.get"), javaType = Contact.class) })
    Event getByDivisionRegistration(@Param("divisionId") int divisionId);

    @Select({ "SELECT * FROM EVENT e JOIN DIVISION_REGISTRATION dr ON dr.tournament_edition = e.tournament_edition",
            "JOIN TEAM_REGISTRATION tr ON tr.division_registration = dr.id", "WHERE tr.id IN",
            "<foreach item='teamReg' index='index' collection='teamRegistrations' open='(' separator=',' close=')'>",
            "#{teamReg.id}", "</foreach>", "</script>" })
    List<Event> getByTeamRegistrations(List<TeamRegistration> teamRegistrations);
}
