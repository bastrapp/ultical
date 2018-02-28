package de.ultical.backend.app;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.google.common.cache.CacheBuilderSpec;

import io.dropwizard.Configuration;
import io.dropwizard.db.DataSourceFactory;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode(callSuper = false)
public class UltiCalConfig extends Configuration {

    @Data
    public static class MailConfig {
        private String smtpHost;
        private String smtpUser;
        private String smtpPassword;
        private String smtpPort;
        private String smtpSender;
    }

    @Data
    public static class DebugMode {
        private boolean enabled = false;
        private String mailCatcher = "";
    }

    @Data
    public static class JobsConfig {
        private boolean dfvMvSyncEnabled = false;
    }

    @Data
    public static class ExternalService {
        private String url;
        private String secret;
    }
    
    @Data
    public static class TravelCompensationFees {
    	private double indoor = 0.75;
    	private double outdoor = 0.75;
    }

    private DfvApiConfig dfvApi;

    private DebugMode debugMode;

    private ExternalService reCaptcha;

    private JobsConfig jobs;

    @NotNull
    private DataSourceFactory database;

    private CacheBuilderSpec authenticationCache = CacheBuilderSpec.parse("maximumSize = 1000");

    @NotNull
    private MailConfig mail;

    private String frontendUrl;

    private boolean corsFilterEnabled = false;

    private List<String> overallAdmins;
    
    private ExternalService geocoderConfig;
    
    private TravelCompensationFees travelFees = new TravelCompensationFees();
}
