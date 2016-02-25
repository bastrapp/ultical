package de.ultical.backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.ultical.backend.data.mapper.TeamMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Team extends Identifiable {
    private String name;
    private String description;
    private List<User> admins;
    private Location location;
    private int foundingDate;
    private String emails;
    private String url;
    private String contactEmail;
    private String twitterName;
    private String facebookUrl;
    private Club club;

    @JsonManagedReference
    private List<Roster> rosters;

    @Override
    public Class<TeamMapper> getMapper() {
        return TeamMapper.class;
    }
}
