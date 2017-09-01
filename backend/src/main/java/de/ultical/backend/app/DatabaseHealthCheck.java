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
package de.ultical.backend.app;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Objects;

import javax.sql.DataSource;

import com.codahale.metrics.health.HealthCheck;

public class DatabaseHealthCheck extends HealthCheck {

	private final DataSource dataSource;
	
	public DatabaseHealthCheck(DataSource ds) {
		this.dataSource = Objects.requireNonNull(ds);
	}
	
	@Override
	protected Result check() throws Exception {
		if (dataSource == null) {
			return Result.unhealthy("No Config present!");
		}
		Result result = null;
		try (Connection connection = this.dataSource.getConnection()){
			Statement stmt = connection.createStatement();
			ResultSet queryResult = stmt.executeQuery("SELECT 1");
			if (queryResult != null) {
				result = Result.healthy();
			} else {
				result = Result.unhealthy("Query did not provide a result");
			}
			
		} catch (SQLException e) {
			result = Result.unhealthy(e);
		}
		
		return result;
	}

}
