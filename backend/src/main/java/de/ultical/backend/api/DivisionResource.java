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
package de.ultical.backend.api;

import javax.inject.Inject;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import org.apache.ibatis.exceptions.PersistenceException;

import de.ultical.backend.data.DataStore;
import de.ultical.backend.model.DivisionRegistrationTeams;
import de.ultical.backend.model.Team;
import de.ultical.backend.model.TeamRegistration;
import de.ultical.backend.model.User;
import io.dropwizard.auth.Auth;

@Path("/divisions")
public class DivisionResource {

    @Inject
    DataStore dStore;

    @POST
    @Path("/{divisionId}/registerTeam/{teamId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void registerTeam(@Auth @NotNull User currentUser, @PathParam("divisionId") Integer divisionId,
            @PathParam("teamId") Integer teamId, TeamRegistration teamReg) {
        if (this.dStore == null) {
            throw new WebApplicationException("Injection DataStore failed!");
        }

        /*
         * If the client provided a team-instance as part of the payload, then
         * we expect that the provided team's id and the request url's teamId
         * are equals. If no team is provided, we create a fake team object that
         * only serves as holder for the id.
         */
        if (teamReg.getTeam() == null) {
            final Team fakeTeam = new Team();
            fakeTeam.setId(teamId);
            teamReg.setTeam(fakeTeam);
        } else {
            final Team receivedTeam = teamReg.getTeam();
            if (!teamId.equals(receivedTeam.getId())) {
                throw new WebApplicationException("Request URL and payload do not match! team-id differs!",
                        Status.NOT_ACCEPTABLE);
            }
        }

        try (AutoCloseable c = this.dStore.getClosable()) {
            Team loadedTeam = this.dStore.get(teamId, Team.class);
            if (loadedTeam == null) {
                throw new WebApplicationException(String.format("A team with id %d does not exist", teamId),
                        Status.NOT_FOUND);
            } else if (!loadedTeam.getAdmins().contains(currentUser)) {
                throw new WebApplicationException(
                        String.format("You are not an admin for team %s", loadedTeam.getName()), Status.FORBIDDEN);
            }

            final DivisionRegistrationTeams divisionReg = new DivisionRegistrationTeams();
            divisionReg.setId(divisionId);

            this.dStore.registerTeamForDivision(divisionReg, teamReg);
        } catch (PersistenceException pe) {
            throw new WebApplicationException("Accessing the database failed!", pe);
        } catch (Exception e) {
            // only for the compiler
        }
    }

    @DELETE
    @Path("/{divisionId}/registerTeam/{teamId}")
    public void unregisterTeam(@Auth @NotNull User currentUser, @PathParam("divisionId") Integer divId,
            @PathParam("teamId") Integer teamId) {
        if (this.dStore == null) {
            throw new WebApplicationException("Injection DataStore failed!");
        }
        try (AutoCloseable c = this.dStore.getClosable()) {
            Team teamInDB = this.dStore.get(teamId, Team.class);
            if (teamInDB == null) {
                throw new WebApplicationException(String.format("Team with id %d does not exist", teamId),
                        Status.NOT_FOUND);
            }
            if (!teamInDB.getAdmins().contains(currentUser)) {
                throw new WebApplicationException(String.format("You are not an admin for team %s", teamInDB.getName()),
                        Status.FORBIDDEN);
            }
            final DivisionRegistrationTeams fakeReg = new DivisionRegistrationTeams();
            fakeReg.setId(divId);
            final Team fakeTeam = new Team();
            fakeTeam.setId(teamId);

            this.dStore.unregisterTeamFromDivision(fakeReg, fakeTeam);
        } catch (PersistenceException pe) {
            throw new WebApplicationException("Accessing database failed!", pe);
        } catch (Exception e) {
            // only for the compiler
            throw new WebApplicationException(e);
        }
    }
}
