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

import org.apache.ibatis.annotations.*;

import de.ultical.backend.model.Season;

public interface SeasonMapper extends BaseMapper<Season> {

	@Select({ "SELECT * FROM SEASON WHERE id=#{id}" })
	@Results({ @Result(property = "id", column = "id"), @Result(column = "version", property = "version"),
			@Result(column = "surface", property = "surface"), @Result(column = "season_year", property = "year"),
			@Result(column = "plusOneYear", property = "plusOneYear") })
	Season get(int id);

	@Select("SELECT * from SEASON")
	@Results({ @Result(property = "id", column = "id"), @Result(column = "version", property = "version"),
			@Result(column = "surface", property = "surface"), @Result(column = "season_year", property = "year"),
			@Result(column = "plusOneYear", property = "plusOneYear") })
	List<Season> getAll();

	@Insert({"INSERT INTO SEASON (surface, season_year, plusOneYear)",
		"VALUES (#{surface},#{year},#{plusOneYear})"})
	@Options(useGeneratedKeys=true, keyProperty="id")
	Integer insert(Season season);

	@Update({"UPDATE SEASON SET",
		"version=version+1, surface=#{surface}, season_year=#{year}, plusOneYear=#{plusOneYear}",
		"WHERE id=#{id} AND version=#{version}"})
	Integer update(Season season);

	@Delete("DELETE FROM SEASON WHERE id=#{id}")
	void delete(Season season);
}
